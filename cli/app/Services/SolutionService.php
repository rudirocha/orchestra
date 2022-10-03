<?php 

namespace App\Services;

use App\Constants;
use App\Models\SolutionInterface;
use Minicli\App;
use Minicli\ServiceInterface;
use Minicli\Stencil;

class SolutionService implements ServiceInterface
{
    private StencilService $stencilService;

    public function generate(SolutionInterface $solution)
    {
        $content = $this->stencilService
        ->applyTemplate(Constants::ORCHESTRA_TEMPLATE_SOLUTION, $solution->toArray());
        
        file_put_contents($solution->getPath(), $content);
    }

    public function load(App $app): void
    {
        $this->stencilService = $app->stencilService;
    }
}