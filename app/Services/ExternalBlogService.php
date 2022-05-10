<?php

namespace App\Services;

use App\Services\Dto\PostDto;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class ExternalBlogService
{
    /**
     * get a list of blog post from external blog
     * 
     * @return PostDto[]
     */
    public function getLatestPost(): array
    {
        $response = Http::get(config('app.external_blog_url'));

        if ($response->ok()) {
            $posts = $response->json()['data'];

            return collect($posts)->map(function ($post) {
                return new PostDto($post);
            })->toArray();
        }

        Log::error("ExternalBlogService:getLatestPost > failed to pull blog post with status code {$response->status()}");
        return [];
    }
}
