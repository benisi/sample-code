<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PostController extends Controller
{
    public function allPost(Request $request)
    {
        return Inertia::render('Post/AllPost', [
            'posts' => Post::sort($request)->with('user')->paginate(10),
            'sortBy' => $request->query('sort_publication_date', 'recent') 
        ]);
    }
}
