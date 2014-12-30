<?php

use yii\db\Schema;
use yii\db\Migration;

class m141230_095748_add_table_voivodship extends Migration
{
    public function safeUp()
    {
        $this->createTable('voivodship', array(
        'id' => Schema::TYPE_PK,
        'name' => "varchar(30)"
        ));
        return true;
    }

    public function safeDown()
    {
        $this->dropTable('voivodship');
        return true;
    }
}
