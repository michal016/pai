<?php

use yii\db\Schema;
use yii\db\Migration;

class m141231_100153_add_districts extends Migration
{
    public function safeUp()
    {
        $this->insert('district', array(
            'name' => 'Suski',
            'voivodship_id' => '1'
        ));
        $this->insert('district', array(
            'name' => 'Żywiecki',
            'voivodship_id' => '2'
        ));
        $this->insert('district', array(
            'name' => 'm. Katowice',
            'voivodship_id' => '2'
        ));
        return true;
    }

    public function safeDown()
    {
        $this->delete('district');
        return true;
    }
}
