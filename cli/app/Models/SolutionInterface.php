<?php

namespace App\Models;

interface SolutionInterface {

    public function getName() : string;
    public function getVersion() : string;
    public function getPath(): string;
    public function addProject(Project $project) : void;
    public function getProjects() : array;

    public function toArray() : array;
}