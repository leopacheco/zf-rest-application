<?php
/*
 * douggr/zf-rest-application
 *
 * @link https://github.com/douggr/zf-rest-application for the canonical source repository
 * @version 1.0.0
 */

use ZfRest\Auth;
use ZfRest\Auth\Exception as AuthException;

/**
 * {@inheritdoc}
 */
class Oauth_LoginController extends ZfRest\Controller\Rest
{
    /**
     * {@inheritdoc}
     */
    public function postAction()
    {
        try {
            $username   = $this->input->username;
            $password   = $this->input->password;
            $this->data = Auth::authenticate($username, $password);

        } catch (AuthException $authException) {
            $this->getResponse()
                ->setHttpResponseCode(401);

            $this->pushError(
                'uncategorized',
                $authException->getCode(),
                $authException->getMessage()
            );

        } catch (Exception $e) {
            $this->getResponse()
                ->setHttpResponseCode(500);

            $this->pushError('unknown', $e->getCode(), $e->getMessage());
        } finally {
            // log…
        }
    }
}
