<?php

namespace App\Filters\Partials\Interface;

use Illuminate\Contracts\Database\Eloquent\Builder;

Interface SortableFilterInterface {
    /**
     * perform the sorting
     *
     * @return Builder
     */
    public function sort($builder, $value): Builder;

     /**
     * get the sort direction, this give you the ability to set a default sort
     * 
     * @param string $value
     * 
     * @return string
     */
    public function getDirection(?string $value) ;
}