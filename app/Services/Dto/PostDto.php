<?php
namespace App\Services\Dto;

use Spatie\DataTransferObject\DataTransferObject;

class PostDto extends DataTransferObject {
    public string $title;
    public string $description;
    public string $publication_date;
}