<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Inertia\Inertia;

class PostController extends Controller
{
    public function allPost()
    {
        return Inertia::render('Post/AllPost', [
            'posts' => Post::with('user')->paginate(10)
        ]);
    }
}
