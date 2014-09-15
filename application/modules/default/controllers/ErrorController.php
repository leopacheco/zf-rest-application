<?php
/*
 * douggr/zf-rest-application
 *
 * @link https://github.com/douggr/zf-rest-application for the canonical source repository
 * @version 1.0.0
 */

/**
 * {@inheritdoc}
 */
class Default_ErrorController extends ZfRest\Controller\Rest
{
    /**
     * Used for handling errors.
     */
    public function errorAction()
    {
        $exception = $this->_getParam('error_handler')->exception;
        $this->pushError('uncategorized', $exception->getCode(), $exception->getMessage());
    }
}
