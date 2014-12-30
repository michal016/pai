<?php

use yii\db\Schema;
use yii\db\Migration;

class m141230_095828_add_table_community extends Migration
{
    public function safeUp()
    {
        $this->createTable('community', array(
            'id' => Schema::TYPE_PK,
            'name' => "varchar(30)",
            'district_id' => "int(11)"
        ));
        $this->addForeignKey('fk_c_district_id_d_id', 'community', 'district_id', 'district', 'id', "SET NULL", "CASCADE");
        return true;
    }

    public function safeDown()
    {
        $this->dropForeignKey('fk_c_district_id_d_id', 'community');
        $this->dropTable('community');
        return true;
    }
}
