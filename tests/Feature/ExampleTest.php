<?php

it('returns a successful response', function () {
    $response = $this->get('/confirmar');

    $response->assertStatus(200);
});
