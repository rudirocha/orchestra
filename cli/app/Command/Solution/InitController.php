<?php
namespace App\Command\Solution;

use App\Constants;
use App\Models\Solution;
use App\Models\SolutionInterface;
use Minicli\Command\CommandController;
use Minicli\Stencil;

class InitController extends CommandController
{
    public function handle(): void
    {
        if (!$this->hasParam('working-dir')) {
            $this->getPrinter()->error('Missing required param [working-dir]', true);
            $this->getPrinter()->newline();
            return;
        }
        $workingDir = $this->getParam('working-dir');

        if (!is_dir($workingDir)) {
            $this->getPrinter()->error('[working-dir] is invalid. Please provide a valid directory', true);
            $this->getPrinter()->newline();
            return;
        }

        $manifestFile = sprintf('%s/%s', $workingDir, Constants::ORCHESTRA_FILENAME); 
        
        if (is_file($manifestFile)) {
            $this->getPrinter()->info('Orchestra manifest file is already created.', true);
            $this->getPrinter()->newline();
            return;
        } else {
            $this->getPrinter()->info('Creating the Orchestra file...');
            
            $solution = new Solution(
                $this->hasParam(Constants::ORCHESTRA_SOLUTION_NAME) ? $this->getParam(Constants::ORCHESTRA_SOLUTION_NAME) : Constants::ORCHESTRA_SOLUTION_NAME_DEFAULT,
                Constants::ORCHESTRA_SOLUTION_VERSION,
                $manifestFile
            );

            $this->getApp()->solutionService->generate($solution);

            $this->getPrinter()->success(
                sprintf('[%s] successfuly created.', $manifestFile),
                true
            );
            $this->getPrinter()->newline();
        }
    }
}