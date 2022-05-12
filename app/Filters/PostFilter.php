<?php

namespace App\Filters;

use App\Filters\Partials\Sorters\PublicationDateSorter;

class PostFilter extends AbstractFilter
{
    protected $sorters = [
        'sort_publication_date' => PublicationDateSorter::class
    ];
}
