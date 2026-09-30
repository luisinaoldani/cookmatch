import { useState, useEffect } from "react";
import axios from "axios";
import { Receta } from "../../entities/receta.entity";
import { createReceta, updateReceta } from "../../services/receta.service";
import { createIngrediente } from "../../services/ingrediente.service";
import { useEtiquetas } from "../../hooks/useEtiqueta";
import { useUtensilios } from "../../hooks/useUtensilio";
import { useRestriccionesAlimentarias } from "../../hooks/useRestriccion_alimentaria";
import { useIngredientes } from "../../hooks/useIngrediente";
import Input from "../ui/input";
import Button from "../ui/button";

interface RecetaFormProps {
  recetaEditar?: Receta;
  onGuardado: () => void;
  onCancelar?: () => void;
}

// Una fila del formulario: un ingrediente del catálogo (por id) con su
// cantidad y unidad. Todo va como string porque son valores de inputs;
// se convierte a número recién al enviar.
interface FilaIngrediente {
  ingredienteId: string;
  cantidad: string;
  unidadMedida: string;
}

// Acepta "1,5" además de "1.5", porque en español se suele escribir con coma.
const parseCantidad = (valor: string) => Number(valor.replace(",", "."));

function RecetaForm({ recetaEditar, onGuardado, onCancelar }: RecetaFormProps) {
  const { etiquetas } = useEtiquetas();
  const { utensilios } = useUtensilios();
  const { restricciones } = useRestriccionesAlimentarias();
  const { ingredientes: catalogoIngredientes, recargar: recargarIngredientes } = useIngredientes();

  const [nombre, setNombre] = useState("");
  const [dificultad, setDificultad] = useState("Fácil");
  const [tiempoMin, setTiempoMin] = useState("");
  const [estado, setEstado] = useState("Borrador");
  const [etiquetasSeleccionadas, setEtiquetasSeleccionadas] = useState<number[]>([]);
  const [utensiliosSeleccionados, setUtensiliosSeleccionados] = useState<number[]>([]);
  const [restriccionesSeleccionadas, setRestriccionesSeleccionadas] = useState<number[]>([]);
  const [filasIngredientes, setFilasIngredientes] = useState<FilaIngrediente[]>([]);
  // Descripciones de los pasos en orden: la posición define el número de paso.
  const [pasosTexto, setPasosTexto] = useState<string[]>([]);
  const [mostrarNuevoIngrediente, setMostrarNuevoIngrediente] = useState(false);
  const [nombreNuevoIngrediente, setNombreNuevoIngrediente] = useState("");
  const [creandoIngrediente, setCreandoIngrediente] = useState(false);
  const [errorNuevoIngrediente, setErrorNuevoIngrediente] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const esEdicion = !!recetaEditar;

  useEffect(() => {
    if (recetaEditar) {
      setNombre(recetaEditar.nombre);
      setDificultad(recetaEditar.dificultad);
      setTiempoMin(String(recetaEditar.tiempoMin));
      setEstado(recetaEditar.estado);
      setEtiquetasSeleccionadas(recetaEditar.etiquetas?.map((e) => e.id!) ?? []);
      setUtensiliosSeleccionados(recetaEditar.utensilios?.map((u) => u.id!) ?? []);
      setRestriccionesSeleccionadas(recetaEditar.restricciones?.map((r) => r.id!) ?? []);
      setFilasIngredientes(
        recetaEditar.ingredientes?.map((ri) => ({
          ingredienteId: String(ri.ingrediente.id!),
          cantidad: String(ri.cantidad),
          unidadMedida: ri.unidadMedida,
        })) ?? []
      );
      setPasosTexto(
        [...(recetaEditar.pasos ?? [])]
          .sort((a, b) => a.numero - b.numero)
          .map((p) => p.descripcion)
      );
    }
  }, [recetaEditar]);

  const toggleEtiqueta = (id: number) => {
    setEtiquetasSeleccionadas((prev) =>
      prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]
    );
  };

  const toggleUtensilio = (id: number) => {
    setUtensiliosSeleccionados((prev) =>
      prev.includes(id) ? prev.filter((u) => u !== id) : [...prev, id]
    );
  };

  const toggleRestriccion = (id: number) => {
    setRestriccionesSeleccionadas((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  };

  const agregarFila = () => {
    setFilasIngredientes((prev) => [...prev, { ingredienteId: "", cantidad: "", unidadMedida: "" }]);
  };

  const actualizarFila = (indice: number, cambios: Partial<FilaIngrediente>) => {
    setFilasIngredientes((prev) =>
      prev.map((fila, i) => (i === indice ? { ...fila, ...cambios } : fila))
    );
  };

  const quitarFila = (indice: number) => {
    setFilasIngredientes((prev) => prev.filter((_, i) => i !== indice));
  };

  const agregarPaso = () => {
    setPasosTexto((prev) => [...prev, ""]);
  };

  const actualizarPaso = (indice: number, descripcion: string) => {
    setPasosTexto((prev) => prev.map((texto, i) => (i === indice ? descripcion : texto)));
  };

  const quitarPaso = (indice: number) => {
    setPasosTexto((prev) => prev.filter((_, i) => i !== indice));
  };

  // Intercambia el paso con el de arriba (-1) o el de abajo (+1).
  const moverPaso = (indice: number, direccion: -1 | 1) => {
    setPasosTexto((prev) => {
      const destino = indice + direccion;
      if (destino < 0 || destino >= prev.length) return prev;
      const copia = [...prev];
      [copia[indice], copia[destino]] = [copia[destino], copia[indice]];
      return copia;
    });
  };

  // Ids ya elegidos en alguna fila: se ocultan en las otras filas para que
  // no se pueda repetir un ingrediente en la misma receta.
  const idsUsados = filasIngredientes
    .filter((f) => f.ingredienteId !== "")
    .map((f) => Number(f.ingredienteId));

  // Deja el ingrediente elegido en la primera fila vacía; si no hay ninguna,
  // agrega una fila nueva con ese ingrediente ya seleccionado.
  const asignarIngredienteAFila = (ingredienteId: string) => {
    setFilasIngredientes((prev) => {
      const indiceVacio = prev.findIndex((f) => f.ingredienteId === "");
      if (indiceVacio === -1) {
        return [...prev, { ingredienteId, cantidad: "", unidadMedida: "" }];
      }
      return prev.map((f, i) => (i === indiceVacio ? { ...f, ingredienteId } : f));
    });
  };

  const cerrarNuevoIngrediente = () => {
    setMostrarNuevoIngrediente(false);
    setNombreNuevoIngrediente("");
    setErrorNuevoIngrediente(null);
  };

  const crearIngredienteNuevo = async () => {
    const nombreLimpio = nombreNuevoIngrediente.trim();
    if (!nombreLimpio) {
      setErrorNuevoIngrediente("Escribí el nombre del ingrediente");
      return;
    }

    // Si ya está en el catálogo (sin distinguir mayúsculas) no se crea otro:
    // se usa el que existe. El backend igual rechaza duplicados como última defensa.
    const existente = catalogoIngredientes.find(
      (i) => i.nombre.trim().toLowerCase() === nombreLimpio.toLowerCase()
    );

    if (existente && idsUsados.includes(existente.id!)) {
      setErrorNuevoIngrediente("Ese ingrediente ya está en la receta");
      return;
    }

    try {
      setCreandoIngrediente(true);
      setErrorNuevoIngrediente(null);

      const ingrediente = existente ?? (await createIngrediente({ nombre: nombreLimpio }));
      if (!existente) {
        await recargarIngredientes();
      }

      asignarIngredienteAFila(String(ingrediente.id!));
      cerrarNuevoIngrediente();
    } catch (err) {
      const mensajeBackend = axios.isAxiosError(err) ? err.response?.data?.error : undefined;
      setErrorNuevoIngrediente(mensajeBackend ?? "Error al crear el ingrediente");
    } finally {
      setCreandoIngrediente(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nombre.trim() || !tiempoMin) {
      setError("Completá los campos obligatorios");
      return;
    }

    const filasCompletas = filasIngredientes.every(
      (f) => f.ingredienteId !== "" && parseCantidad(f.cantidad) > 0 && f.unidadMedida.trim() !== ""
    );
    if (!filasCompletas) {
      setError("Completá ingrediente, cantidad (mayor a 0) y unidad en cada fila, o quitá las que no uses");
      return;
    }

    if (pasosTexto.some((texto) => texto.trim() === "")) {
      setError("Escribí la descripción de cada paso, o quitá los que estén vacíos");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const etiquetasPayload = etiquetasSeleccionadas.map((id) => ({ id }));
      const utensiliosPayload = utensiliosSeleccionados.map((id) => ({ id }));
      const restriccionesPayload = restriccionesSeleccionadas.map((id) => ({ id }));
      const ingredientesPayload = filasIngredientes.map((f) => ({
        ingrediente: { id: Number(f.ingredienteId) },
        cantidad: parseCantidad(f.cantidad),
        unidadMedida: f.unidadMedida.trim(),
      }));
      // El número de paso no se manda: el backend lo asigna según el orden.
      const pasosPayload = pasosTexto.map((texto) => ({ descripcion: texto.trim() }));

      if (esEdicion && recetaEditar?.id !== undefined) {
        await updateReceta(recetaEditar.id, {
          nombre,
          dificultad,
          tiempoMin: Number(tiempoMin),
          estado,
          etiquetas: etiquetasPayload as any,
          utensilios: utensiliosPayload as any,
          restricciones: restriccionesPayload as any,
          // Solo se manda si la receta llegó con sus ingredientes cargados:
          // el backend reemplaza la lista completa, así que mandar [] por
          // error (porque no se cargaron) borraría los que ya tenía.
          ...(recetaEditar.ingredientes !== undefined && { ingredientes: ingredientesPayload as any }),
          // Igual que con los ingredientes: el backend reemplaza la lista de
          // pasos completa, así que solo se manda si la receta los trajo cargados.
          ...(recetaEditar.pasos !== undefined && { pasos: pasosPayload as any }),
        });
      } else {
        await createReceta({
          nombre,
          dificultad,
          tiempoMin: Number(tiempoMin),
          estado,
          etiquetas: etiquetasPayload as any,
          utensilios: utensiliosPayload as any,
          restricciones: restriccionesPayload as any,
          ingredientes: ingredientesPayload as any,
          pasos: pasosPayload as any,
        });
      }

      setNombre("");
      setDificultad("Fácil");
      setTiempoMin("");
      setEstado("Borrador");
      setEtiquetasSeleccionadas([]);
      setUtensiliosSeleccionados([]);
      setRestriccionesSeleccionadas([]);
      setFilasIngredientes([]);
      setPasosTexto([]);

      onGuardado();
    } catch (err) {
      console.error("Error real:", err);
      setError("Error al guardar la receta");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 bg-white p-4 rounded-lg shadow-sm border border-ink/10">
      <h2 className="font-display font-semibold text-lg text-ink">
        {esEdicion ? "Editar receta" : "Nueva receta"}
      </h2>

      <Input label="Nombre" value={nombre} onChange={setNombre} />

      <div className="flex flex-col gap-1">
        <label className="text-sm text-ink/60">Dificultad</label>
        <select
          value={dificultad}
          onChange={(e) => setDificultad(e.target.value)}
          className="border border-ink/20 rounded px-3 py-2 text-sm"
        >
          <option value="Fácil">Fácil</option>
          <option value="Media">Media</option>
          <option value="Difícil">Difícil</option>
        </select>
      </div>

      <Input
        label="Tiempo estimado (minutos)"
        value={tiempoMin}
        onChange={setTiempoMin}
      />

      <div className="flex flex-col gap-1">
        <label className="text-sm text-ink/60">Estado</label>
        <select
          value={estado}
          onChange={(e) => setEstado(e.target.value)}
          className="border border-ink/20 rounded px-3 py-2 text-sm"
        >
          <option value="Borrador">Borrador</option>
          <option value="Publicada">Publicada</option>
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm text-ink/60">Etiquetas</label>
        <div className="flex flex-wrap gap-2">
          {etiquetas.map((et) => (
            <label key={et.id} className="flex items-center gap-1 text-sm border border-ink/20 rounded-full px-3 py-1 cursor-pointer">
              <input
                type="checkbox"
                checked={etiquetasSeleccionadas.includes(et.id!)}
                onChange={() => toggleEtiqueta(et.id!)}
              />
              {et.nombre}
            </label>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm text-ink/60">Utensilios</label>
        <div className="flex flex-wrap gap-2">
          {utensilios.map((u) => (
            <label key={u.id} className="flex items-center gap-1 text-sm border border-ink/20 rounded-full px-3 py-1 cursor-pointer">
              <input
                type="checkbox"
                checked={utensiliosSeleccionados.includes(u.id!)}
                onChange={() => toggleUtensilio(u.id!)}
              />
              {u.nombre}
            </label>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm text-ink/60">Restricciones alimentarias que cumple</label>
        <div className="flex flex-wrap gap-2">
          {restricciones.map((r) => (
            <label key={r.id} className="flex items-center gap-1 text-sm border border-ink/20 rounded-full px-3 py-1 cursor-pointer">
              <input
                type="checkbox"
                checked={restriccionesSeleccionadas.includes(r.id!)}
                onChange={() => toggleRestriccion(r.id!)}
              />
              {r.nombre}
            </label>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm text-ink/60">Ingredientes</label>

        {catalogoIngredientes.length === 0 && (
          <p className="text-sm text-ink/50">
            Todavía no hay ingredientes cargados. Creálos primero en la sección Ingredientes.
          </p>
        )}

        {filasIngredientes.map((fila, indice) => (
          <div key={indice} className="flex flex-wrap items-center gap-2">
            <select
              value={fila.ingredienteId}
              onChange={(e) => actualizarFila(indice, { ingredienteId: e.target.value })}
              className="border border-ink/20 rounded px-3 py-2 text-sm flex-1 min-w-40"
            >
              <option value="">Elegí un ingrediente</option>
              {catalogoIngredientes
                .filter((i) => i.id === Number(fila.ingredienteId) || !idsUsados.includes(i.id!))
                .map((i) => (
                  <option key={i.id} value={i.id}>
                    {i.nombre}
                  </option>
                ))}
            </select>
            <input
              value={fila.cantidad}
              onChange={(e) => actualizarFila(indice, { cantidad: e.target.value })}
              placeholder="Cantidad"
              inputMode="decimal"
              className="border border-ink/20 rounded px-3 py-2 text-sm w-24"
            />
            <input
              value={fila.unidadMedida}
              onChange={(e) => actualizarFila(indice, { unidadMedida: e.target.value })}
              placeholder="Unidad (g, ml, u...)"
              className="border border-ink/20 rounded px-3 py-2 text-sm w-40"
            />
            <button
              type="button"
              onClick={() => quitarFila(indice)}
              className="text-tomato text-sm hover:underline"
            >
              Quitar
            </button>
          </div>
        ))}

        <div className="flex flex-wrap gap-2">
          <Button texto="+ Agregar ingrediente" variant="secondary" onClick={agregarFila} />
          <Button
            texto="¿No está? Crear ingrediente nuevo"
            variant="secondary"
            onClick={() => setMostrarNuevoIngrediente(true)}
          />
        </div>

        {mostrarNuevoIngrediente && (
          <div className="flex flex-col gap-2 border border-ink/10 rounded p-3">
            <label className="text-sm text-ink/60">Nuevo ingrediente</label>
            <div className="flex flex-wrap items-center gap-2">
              <input
                value={nombreNuevoIngrediente}
                onChange={(e) => setNombreNuevoIngrediente(e.target.value)}
                // Enter crea el ingrediente en vez de enviar el formulario de la receta.
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    crearIngredienteNuevo();
                  }
                }}
                placeholder="Nombre del ingrediente"
                autoFocus
                className="border border-ink/20 rounded px-3 py-2 text-sm flex-1 min-w-40"
              />
              <Button
                texto={creandoIngrediente ? "Creando..." : "Crear y agregar"}
                onClick={crearIngredienteNuevo}
                disabled={creandoIngrediente}
              />
              <Button texto="Cancelar" variant="secondary" onClick={cerrarNuevoIngrediente} />
            </div>
            {errorNuevoIngrediente && <p className="text-tomato text-sm">{errorNuevoIngrediente}</p>}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm text-ink/60">Pasos</label>

        {pasosTexto.map((texto, indice) => (
          <div key={indice} className="flex flex-col gap-1 border border-ink/10 rounded p-3">
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm font-semibold text-ink/70">Paso {indice + 1}</span>
              <div className="flex items-center gap-3 text-sm">
                <button
                  type="button"
                  onClick={() => moverPaso(indice, -1)}
                  disabled={indice === 0}
                  className="text-basil hover:underline disabled:opacity-30 disabled:no-underline"
                >
                  ↑ Subir
                </button>
                <button
                  type="button"
                  onClick={() => moverPaso(indice, 1)}
                  disabled={indice === pasosTexto.length - 1}
                  className="text-basil hover:underline disabled:opacity-30 disabled:no-underline"
                >
                  ↓ Bajar
                </button>
                <button
                  type="button"
                  onClick={() => quitarPaso(indice)}
                  className="text-tomato hover:underline"
                >
                  Quitar
                </button>
              </div>
            </div>
            <textarea
              value={texto}
              onChange={(e) => actualizarPaso(indice, e.target.value)}
              placeholder="Describí qué hay que hacer en este paso"
              maxLength={500}
              rows={2}
              className="border border-ink/20 rounded px-3 py-2 text-sm w-full"
            />
          </div>
        ))}

        <div>
          <Button texto="+ Agregar paso" variant="secondary" onClick={agregarPaso} />
        </div>
      </div>

      {error && <p className="text-tomato text-sm">{error}</p>}

      <div className="flex gap-2">
        <Button texto={loading ? "Guardando..." : "Guardar"} type="submit" disabled={loading} />
        {onCancelar && <Button texto="Cancelar" variant="secondary" onClick={onCancelar} />}
      </div>
    </form>
  );
}

export default RecetaForm;