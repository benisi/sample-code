<?php

namespace App\Filters\Partials\Sorters;

use App\Filters\Partials\Interface\SortableFilterInterface;
use Illuminate\Contracts\Database\Eloquent\Builder;

class PublicationDateSorter implements SortableFilterInterface {
    
    public function sort($builder, $value): Builder{
        $direction = $this->getDirection($value);
        return $builder->orderBy('publication_date',  $direction);
    }

    public function getDirection(?string $value): string{
        $dictionary = [
            'recent' => 'desc',
            'oldest' => 'asc'
        ];
        return $dictionary[$value] ?? 'desc';
    }
}