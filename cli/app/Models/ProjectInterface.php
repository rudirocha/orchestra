<?php
namespace App\Models;

interface ProjectInterface
{
    public function getName(): string;
    public function getPath(): string;
}