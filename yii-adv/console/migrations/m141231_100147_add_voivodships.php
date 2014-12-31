<?php

use yii\db\Schema;
use yii\db\Migration;

class m141231_100147_add_voivodships extends Migration
{
    public function safeUp()
    {
        $this->insert('voivodship', array(
            'name' => 'Małopolskie'
        ));
        $this->insert('voivodship', array(
            'name' => 'Śląskie'
        ));
        return true;
    }

    public function safeDown()
    {
        $this->delete('voivodship');
        return true;
    }
}
