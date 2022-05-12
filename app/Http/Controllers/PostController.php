<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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

    public function userPost(Request $request)
    {
        try {
            return Inertia::render('Post/AllPost', [
                'posts' => Post::sort($request)->where('user_id', Auth::id())->with('user')->paginate(10),
                'sortBy' => $request->query('sort_publication_date', 'recent')
            ]);
        } catch (Exception $e) {
            dump($e->getMessage());
        }
    }
}
