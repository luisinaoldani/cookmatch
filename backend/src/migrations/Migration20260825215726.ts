import { Migration } from '@mikro-orm/migrations';

export class Migration20260825215726 extends Migration {

  override name = 'Migration20260825215726';

  override up(): void | Promise<void> {
    this.addSql(`create table \`etiqueta\` (\`id\` int unsigned not null auto_increment primary key, \`nombre\` varchar(100) not null) default character set utf8mb4 engine = InnoDB;`);

    this.addSql(`create table \`ingrediente\` (\`id\` int unsigned not null auto_increment primary key, \`nombre\` varchar(100) not null) default character set utf8mb4 engine = InnoDB;`);

    this.addSql(`create table \`receta\` (\`id\` int unsigned not null auto_increment primary key, \`nombre\` varchar(100) not null, \`dificultad\` varchar(100) not null, \`tiempo_min\` double unsigned not null, \`estado\` varchar(100) not null) default character set utf8mb4 engine = InnoDB;`);

    this.addSql(`create table \`paso\` (\`receta_id\` int unsigned not null, \`numero\` int unsigned not null, \`descripcion\` varchar(500) not null, primary key (\`receta_id\`, \`numero\`)) default character set utf8mb4 engine = InnoDB;`);
    this.addSql(`alter table \`paso\` add index \`paso_receta_id_index\` (\`receta_id\`);`);

    this.addSql(`create table \`receta_etiquetas\` (\`receta_id\` int unsigned not null, \`etiqueta_id\` int unsigned not null, primary key (\`receta_id\`, \`etiqueta_id\`)) default character set utf8mb4 engine = InnoDB;`);
    this.addSql(`alter table \`receta_etiquetas\` add index \`receta_etiquetas_receta_id_index\` (\`receta_id\`);`);
    this.addSql(`alter table \`receta_etiquetas\` add index \`receta_etiquetas_etiqueta_id_index\` (\`etiqueta_id\`);`);

    this.addSql(`create table \`receta_ingrediente\` (\`receta_id\` int unsigned not null, \`ingrediente_id\` int unsigned not null, \`cantidad\` double unsigned not null, \`unidad_medida\` varchar(100) not null, primary key (\`receta_id\`, \`ingrediente_id\`)) default character set utf8mb4 engine = InnoDB;`);
    this.addSql(`alter table \`receta_ingrediente\` add index \`receta_ingrediente_receta_id_index\` (\`receta_id\`);`);
    this.addSql(`alter table \`receta_ingrediente\` add index \`receta_ingrediente_ingrediente_id_index\` (\`ingrediente_id\`);`);

    this.addSql(`create table \`tipo_restriccion\` (\`id\` int unsigned not null auto_increment primary key, \`tipo\` varchar(100) not null) default character set utf8mb4 engine = InnoDB;`);

    this.addSql(`create table \`restriccion_alimentaria\` (\`tipo_restriccion_id\` int unsigned not null, \`nombre\` varchar(100) not null, \`descripcion\` varchar(500) null, primary key (\`tipo_restriccion_id\`, \`nombre\`)) default character set utf8mb4 engine = InnoDB;`);
    this.addSql(`alter table \`restriccion_alimentaria\` add index \`restriccion_alimentaria_tipo_restriccion_id_index\` (\`tipo_restriccion_id\`);`);

    this.addSql(`create table \`utensilio\` (\`id\` int unsigned not null auto_increment primary key, \`nombre\` varchar(100) not null) default character set utf8mb4 engine = InnoDB;`);

    this.addSql(`create table \`receta_utensilios\` (\`receta_id\` int unsigned not null, \`utensilio_id\` int unsigned not null, primary key (\`receta_id\`, \`utensilio_id\`)) default character set utf8mb4 engine = InnoDB;`);
    this.addSql(`alter table \`receta_utensilios\` add index \`receta_utensilios_receta_id_index\` (\`receta_id\`);`);
    this.addSql(`alter table \`receta_utensilios\` add index \`receta_utensilios_utensilio_id_index\` (\`utensilio_id\`);`);

    this.addSql(`alter table \`paso\` add constraint \`paso_receta_id_foreign\` foreign key (\`receta_id\`) references \`receta\` (\`id\`) on update cascade on delete cascade;`);

    this.addSql(`alter table \`receta_etiquetas\` add constraint \`receta_etiquetas_receta_id_foreign\` foreign key (\`receta_id\`) references \`receta\` (\`id\`) on update cascade on delete cascade;`);
    this.addSql(`alter table \`receta_etiquetas\` add constraint \`receta_etiquetas_etiqueta_id_foreign\` foreign key (\`etiqueta_id\`) references \`etiqueta\` (\`id\`) on update cascade on delete cascade;`);

    this.addSql(`alter table \`receta_ingrediente\` add constraint \`receta_ingrediente_receta_id_foreign\` foreign key (\`receta_id\`) references \`receta\` (\`id\`) on update cascade on delete cascade;`);
    this.addSql(`alter table \`receta_ingrediente\` add constraint \`receta_ingrediente_ingrediente_id_foreign\` foreign key (\`ingrediente_id\`) references \`ingrediente\` (\`id\`) on update cascade on delete cascade;`);

    this.addSql(`alter table \`restriccion_alimentaria\` add constraint \`restriccion_alimentaria_tipo_restriccion_id_foreign\` foreign key (\`tipo_restriccion_id\`) references \`tipo_restriccion\` (\`id\`) on update cascade on delete cascade;`);

    this.addSql(`alter table \`receta_utensilios\` add constraint \`receta_utensilios_receta_id_foreign\` foreign key (\`receta_id\`) references \`receta\` (\`id\`) on update cascade on delete cascade;`);
    this.addSql(`alter table \`receta_utensilios\` add constraint \`receta_utensilios_utensilio_id_foreign\` foreign key (\`utensilio_id\`) references \`utensilio\` (\`id\`) on update cascade on delete cascade;`);
  }

}
