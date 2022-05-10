<?php

namespace App\Console\Commands;

use App\Models\User;
use App\Services\ExternalBlogService;
use Illuminate\Console\Command;

class PullPostFromExternalBlog extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'pull:post';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Pull post from external blog';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle(ExternalBlogService $externalBlogService)
    {
        $posts = $externalBlogService->getLatestPost();

        foreach ($posts as $post) {
            User::admin()->posts()->firstOrCreate(
                [
                    'title' =>  $post->title,
                    'description' => $post->description
                ],
                [
                    'title' =>  $post->title,
                    'description' => $post->description,
                    'publication_date' => $post->publication_date,
                ]
            );
        }
        return 0;
    }
}
