<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreConfirmationRequest;
use App\Models\Confirmation;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class ConfirmationController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Confirmar', [
            'event' => [
                'graduate_name' => config('event.graduate_name'),
                'ceremony_date' => config('event.ceremony_date'),
                'ball_date' => config('event.ball_date'),
                'location' => config('event.location'),
            ],
        ]);
    }

    public function store(StoreConfirmationRequest $request): RedirectResponse
    {
        Confirmation::create([
            ...$request->validated(),
            'confirmed_at' => now(),
            'ip_address' => $request->ip(),
        ]);

        return redirect()->route('confirmations.success');
    }

    public function success(): Response
    {
        return Inertia::render('ConfirmarSuccess');
    }
}
