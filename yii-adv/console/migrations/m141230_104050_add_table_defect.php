<?php

use yii\db\Schema;
use yii\db\Migration;

class m141230_104050_add_table_defect extends Migration
{
    public function safeUp()
    {
        $this->createTable('defect', array(
            'id' => Schema::TYPE_PK,
            'title' => "varchar(100)",
            'description' => Schema::TYPE_TEXT,
            'create_date' => "timestamp default current_timestamp",
            'status' => Schema::TYPE_SMALLINT . " default 0",
            'photo' => "varchar(20)",
            'longitude' => Schema::TYPE_FLOAT,
            'latitude' => Schema::TYPE_FLOAT,
            'community_id' => "int(11)",
            'voivodship_id' => "int(11)",
            'district_id' => "int(11)"
        ), 'ENGINE InnoDB');

        $this->addForeignKey('fk_d_community_id_c_id', 'defect', 'community_id', 'community', 'id', "SET NULL", "CASCADE");
        $this->addForeignKey('fk_d_district_id_d_id', 'defect', 'district_id', 'district', 'id', "SET NULL", "CASCADE");
        $this->addForeignKey('fk_def_voivodship_id_v_id', 'defect', 'voivodship_id', 'voivodship', 'id', "SET NULL", "CASCADE");
        return true;
    }

    public function safeDown()
    {
        $this->dropForeignKey('fk_d_community_id_c_id', 'defect');
        $this->dropForeignKey('fk_def_voivodship_id_v_id', 'defect');
        $this->dropForeignKey('fk_d_district_id_d_id', 'defect');
        $this->dropTable('defect');
        return true;
    }
}
