<?php
namespace App\Command\Project;

use Minicli\Command\CommandController;

class InitController extends CommandController
{
    public function handle(): void
    {
        $workingDir = __DIR__; // to do: replace with dynamic path

        if (!is_dir($workingDir)) {
            $this->getPrinter()->display(sprintf('NOT A DIR'));
        }

        $manifestFile = $workingDir . '/orchestra.json';
        
    }
}