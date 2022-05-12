<?php

namespace App\Exceptions\Traits;

use Inertia\Inertia;
use Symfony\Component\HttpKernel\Exception\HttpExceptionInterface;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

trait InertiaExceptionHandler
{
    public function render($request, Throwable $e)
    {

        $response = parent::render($request, $e);
        $statusCode = $response->status();
        $message = $this->getResponseStatusText($statusCode);




        if (app()->environment('production')) {
            return  Inertia::render('Error', [
                'code' => $statusCode,
                'message' => $message
            ])->toResponse($request)
            ->setStatusCode($statusCode);
        }

        return $response;
    }

    public function getResponseStatusText($statusCode)
    {
        if ($statusCode === 419) {
            return 'Page Expired';
        }

        return Response::$statusTexts[$statusCode];
    }
}
