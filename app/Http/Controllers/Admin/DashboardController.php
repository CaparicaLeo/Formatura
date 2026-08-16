<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Confirmation;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        $confirmations = Confirmation::latest()->paginate(15);

        $totalPeople = Confirmation::sum('id') > 0
            ? Confirmation::selectRaw('COUNT(*) + COALESCE(SUM(JSON_LENGTH(companions)), 0) as total')
                ->value('total')
            : 0;

        return Inertia::render('Dashboard', [
            'confirmations' => $confirmations,
            'stats' => [
                'total_confirmations' => Confirmation::count(),
                'total_people' => (int) $totalPeople,
                'ceremony_date' => config('event.ceremony_date'),
                'ball_date' => config('event.ball_date'),
            ],
        ]);
    }
}
