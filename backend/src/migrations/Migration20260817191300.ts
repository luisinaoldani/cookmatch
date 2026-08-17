import { Migration } from '@mikro-orm/migrations';

export class Migration20260817191300 extends Migration {

  override name = 'Migration20260817191300';

  override up(): void | Promise<void> {
    this.addSql(`create table \`etiqueta\` (\`id\` int unsigned not null auto_increment primary key, \`nombre\` varchar(100) not null) default character set utf8mb4 engine = InnoDB;`);

    this.addSql(`create table \`ingrediente\` (\`id\` int unsigned not null auto_increment primary key, \`nombre\` varchar(45) not null) default character set utf8mb4 engine = InnoDB;`);

    this.addSql(`create table \`receta\` (\`id\` int unsigned not null auto_increment primary key, \`nombre\` varchar(100) not null, \`dificultad\` varchar(100) not null, \`tiempoMin\` double unsigned not null, \`estado\` varchar(100) not null) default character set utf8mb4 engine = InnoDB;`);

    this.addSql(`create table \`paso\` (\`idReceta\` int unsigned not null, \`numero\` int unsigned not null, \`descripcion\` varchar(500) not null, primary key (\`idReceta\`, \`numero\`)) default character set utf8mb4 engine = InnoDB;`);
    this.addSql(`alter table \`paso\` add index \`paso_idReceta_index\` (\`idReceta\`);`);

    this.addSql(`create table \`receta_etiqueta\` (\`idReceta\` int unsigned not null, \`idEtiqueta\` int unsigned not null, primary key (\`idReceta\`, \`idEtiqueta\`)) default character set utf8mb4 engine = InnoDB;`);
    this.addSql(`alter table \`receta_etiqueta\` add index \`receta_etiqueta_idReceta_index\` (\`idReceta\`);`);
    this.addSql(`alter table \`receta_etiqueta\` add index \`receta_etiqueta_idEtiqueta_index\` (\`idEtiqueta\`);`);

    this.addSql(`create table \`receta_ingrediente\` (\`idReceta\` int unsigned not null, \`idIngrediente\` int unsigned not null, \`cantidad\` double unsigned not null, \`unidadMedida\` varchar(100) not null, primary key (\`idReceta\`, \`idIngrediente\`)) default character set utf8mb4 engine = InnoDB;`);
    this.addSql(`alter table \`receta_ingrediente\` add index \`receta_ingrediente_idReceta_index\` (\`idReceta\`);`);
    this.addSql(`alter table \`receta_ingrediente\` add index \`receta_ingrediente_idIngrediente_index\` (\`idIngrediente\`);`);

    this.addSql(`create table \`tipo_restriccion\` (\`id\` int unsigned not null auto_increment primary key, \`tipo\` varchar(100) not null) default character set utf8mb4 engine = InnoDB;`);

    this.addSql(`create table \`restriccion_alimentaria\` (\`idTipo\` int unsigned not null, \`nombre\` varchar(100) not null, \`descripcion\` varchar(500) null, primary key (\`idTipo\`, \`nombre\`)) default character set utf8mb4 engine = InnoDB;`);
    this.addSql(`alter table \`restriccion_alimentaria\` add index \`restriccion_alimentaria_idTipo_index\` (\`idTipo\`);`);

    this.addSql(`create table \`utensilio\` (\`id\` int unsigned not null auto_increment primary key, \`nombre\` varchar(100) not null) default character set utf8mb4 engine = InnoDB;`);

    this.addSql(`create table \`receta_utensilio\` (\`idReceta\` int unsigned not null, \`idUtensilio\` int unsigned not null, primary key (\`idReceta\`, \`idUtensilio\`)) default character set utf8mb4 engine = InnoDB;`);
    this.addSql(`alter table \`receta_utensilio\` add index \`receta_utensilio_idReceta_index\` (\`idReceta\`);`);
    this.addSql(`alter table \`receta_utensilio\` add index \`receta_utensilio_idUtensilio_index\` (\`idUtensilio\`);`);

    this.addSql(`alter table \`paso\` add constraint \`paso_idReceta_foreign\` foreign key (\`idReceta\`) references \`receta\` (\`id\`) on update cascade on delete cascade;`);

    this.addSql(`alter table \`receta_etiqueta\` add constraint \`receta_etiqueta_idReceta_foreign\` foreign key (\`idReceta\`) references \`receta\` (\`id\`) on update cascade on delete cascade;`);
    this.addSql(`alter table \`receta_etiqueta\` add constraint \`receta_etiqueta_idEtiqueta_foreign\` foreign key (\`idEtiqueta\`) references \`etiqueta\` (\`id\`) on update cascade on delete cascade;`);

    this.addSql(`alter table \`receta_ingrediente\` add constraint \`receta_ingrediente_idReceta_foreign\` foreign key (\`idReceta\`) references \`receta\` (\`id\`) on update cascade on delete cascade;`);
    this.addSql(`alter table \`receta_ingrediente\` add constraint \`receta_ingrediente_idIngrediente_foreign\` foreign key (\`idIngrediente\`) references \`ingrediente\` (\`id\`) on update cascade on delete cascade;`);

    this.addSql(`alter table \`restriccion_alimentaria\` add constraint \`restriccion_alimentaria_idTipo_foreign\` foreign key (\`idTipo\`) references \`tipo_restriccion\` (\`id\`) on update cascade on delete cascade;`);

    this.addSql(`alter table \`receta_utensilio\` add constraint \`receta_utensilio_idReceta_foreign\` foreign key (\`idReceta\`) references \`receta\` (\`id\`) on update cascade on delete cascade;`);
    this.addSql(`alter table \`receta_utensilio\` add constraint \`receta_utensilio_idUtensilio_foreign\` foreign key (\`idUtensilio\`) references \`utensilio\` (\`id\`) on update cascade on delete cascade;`);
  }

}
