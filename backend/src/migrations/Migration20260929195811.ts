import { Migration } from '@mikro-orm/migrations';

export class Migration20260929195811 extends Migration {

  override name = 'Migration20260929195811';

  override up(): void | Promise<void> {
    this.addSql(`alter table \`ingrediente\` add unique \`ingrediente_nombre_unique\` (\`nombre\`);`);

    this.addSql(`alter table \`receta\` modify \`tiempo_min\` double unsigned not null;`);

    this.addSql(`alter table \`receta_ingrediente\` modify \`cantidad\` double unsigned not null;`);
  }

  override down(): void | Promise<void> {
    this.addSql(`alter table \`ingrediente\` drop index \`ingrediente_nombre_unique\`;`);

    this.addSql(`alter table \`receta\` modify \`tiempo_min\` double unsigned not null;`);

    this.addSql(`alter table \`receta_ingrediente\` modify \`cantidad\` double unsigned not null;`);
  }

}
