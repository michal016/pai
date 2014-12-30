<?php

use yii\db\Schema;
use yii\db\Migration;

class m141230_095817_add_table_district extends Migration
{
    public function safeUp()
    {
        $this->createTable('district', array(
            'id' => Schema::TYPE_PK,
            'name' => "varchar(30)",
            'voivodship_id' => "int(11)"
        ));
        $this->addForeignKey('fk_d_voivodship_id_v_id', 'district', 'voivodship_id', 'voivodship', 'id', "SET NULL", "CASCADE");
        return true;
    }

    public function safeDown()
    {
        $this->dropForeignKey('fk_d_voivodship_id_v_id', 'district');
        $this->dropTable('district');
        return true;
    }
}
