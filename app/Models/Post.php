<?php

namespace App\Models;

use App\Filters\PostFilter;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function scopeSort(Builder $builder, $request)
    {
        return (new PostFilter($request))->sort($builder);
    }
}
