<?php

namespace App\Filters;

use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Http\Request;

abstract class AbstractFilter
{
    protected $request;
    protected $filters = [];

    public function __construct(Request $request)
    {
        $this->request = $request;
    }

    public function sort(Builder $builder)
    {
        foreach ($this->getSorters() as $sorter => $value) {
            $this->resolveSorter($sorter)->sort($builder, $value);
        }

        return $builder;
    }

    protected function getSorters()
    {
        $dictionaryOfSorterValue = [];
        foreach ($this->sorters as $sorter => $sorterClass) {
            $dictionaryOfSorterValue[$sorter] = $this->request->get($sorter);
        }

        return $dictionaryOfSorterValue;
    }

    protected function resolveSorter($sorter)
    {
        return new $this->sorters[$sorter];
    }
}
