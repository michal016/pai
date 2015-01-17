<?php

use yii\db\Schema;
use yii\db\Migration;

class m150115_192510_add_columns_to_user_table extends Migration
{
    public function safeUp()
    {
        $this->addColumn('user', 'community_id', 'int(11)');
        $this->addColumn('user', 'district_id', 'int(11)');
        $this->addColumn('user', 'voivodship_id', 'int(11)');
        $this->addForeignKey('fk_u_community_id_c_id', 'user', 'community_id', 'community', 'id', "SET NULL", "CASCADE");
        $this->addForeignKey('fk_u_district_id_d_id', 'user', 'district_id', 'district', 'id', "SET NULL", "CASCADE");
        $this->addForeignKey('fk_u_voivodship_id_v_id', 'user', 'voivodship_id', 'voivodship', 'id', "SET NULL", "CASCADE");

        return true;
    }

    public function safeDown()
    {
        $this->dropForeignKey('fk_u_community_id_c_id', 'user');
        $this->dropForeignKey('fk_u_district_id_d_id', 'user');
        $this->dropForeignKey('fk_u_voivodship_id_v_id', 'user');
        $this->dropColumn('user', 'community_id');
        $this->dropColumn('user', 'district_id');
        $this->dropColumn('user', 'voivodship_id');

        return true;
    }
}
