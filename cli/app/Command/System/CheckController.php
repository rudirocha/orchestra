<?php

namespace App\Command\System;

use Minicli\Command\CommandController;

class CheckController extends CommandController
{
    public function handle(): void
    {
        $this->getPrinter()->display('Orchestra is Running OK');
    }
}