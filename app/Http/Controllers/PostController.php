<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PostController extends Controller
{
    public function allPost(Request $request)
    {
        return Inertia::render('Post/AllPost', [
            'posts' => Post::sort($request)->with('user')->paginate(10),
            'sortBy' => $request->query('sort_publication_date', 'recent'),
            'title' => 'Home'
        ]);
    }

    public function userPost(Request $request)
    {
        return Inertia::render('Post/AllPost', [
            'posts' => Post::sort($request)->where('user_id', Auth::id())->with('user')->paginate(10),
            'sortBy' => $request->query('sort_publication_date', 'recent'),
            'title' => 'Dashboard'
        ]);
    }

    public function storePost(Request $request)
    {
        $request->validate([
            'title' => 'bail|required|string',
            'description' => 'required|string',
        ]);

        Post::create(
            [
                'title' => $request->title,
                'description' => $request->description,
                'publication_date' => now()->toDateTimeString(),
                'user_id' => Auth::id()
            ]
        );

        return redirect('/dashboard');
    }
}
