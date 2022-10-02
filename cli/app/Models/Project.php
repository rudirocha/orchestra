<?php

namespace App\Models;

class Project implements ProjectInterface
{
    public readonly string $name;
    public readonly string $path;

    public function getName() : string
    {
        return $this->name;
    }

    public function getPath() : string
    {
        return $this->path;
    }
}