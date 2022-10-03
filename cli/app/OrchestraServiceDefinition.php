<?php 

namespace App;

use App\Services\SolutionService;
use App\Services\StencilService;

final class OrchestraServiceDefinition {

    public static function getOrchestraServices(): array
    {
        return [
            'solutionService' => new SolutionService(),
            'stencilService' => new StencilService(
                sprintf('%s/%s', 
            __DIR__,
            Constants::ORCHESTRA_TEMPLATE_FOLDER)
            )
        ];
    }
}