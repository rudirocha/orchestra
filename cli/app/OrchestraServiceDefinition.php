<?php 

namespace App;

use App\Services\SolutionService;

final class OrchestraServiceDefinition {
    public static function getOrchestraServices(): array
    {
        return [
            'solutionService' => new SolutionService()
        ];
    }
}