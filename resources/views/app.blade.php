<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="theme-color" content="#0a0a0a">

        <title inertia>{{ config('app.name', 'Formatura Leo') }}</title>

        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700&display=swap" rel="stylesheet">

        @routes
        @viteReactRefresh
        @vite('resources/js/app.jsx')
        <x-inertia::head />
    </head>
    <body class="antialiased" style="background-color: #0a0a0a; color: #e5e5e5;">
        <x-inertia::app />
    </body>
</html>
