<?php
/*
 * douggr/zf-rest-application
 *
 * @link https://github.com/douggr/zf-rest-application for the canonical source repository
 * @version 1.0.0
 */

use ZfRest\Model\User as Table;

/**
 * {@inheritdoc}
 */
class Default_UsersController extends ZfRest\Controller\Rest
{
    /**
     * {@inheritdoc}
     */
    public function deleteAction()
    {
        if (!$this->hasAuth()) {
            $this->_skipAction(401, 'ERR.UNAUTHORIZED');
        }

        if (!$this->isAdmin()) {
            $this->_skipAction(403, 'ERR.FORBIDDEN');
        }

        $id = $this->getRequest()->getParam('id');

        if (preg_match('/\d+/', $id)) {
            $column = 'id';
        } else {
            $column = 'username';
        }

        $model = new Table();
        $where = $model->getAdapter()
            ->quoteInto("$column = ?", $id);

        $model->delete($where);

        $this->data = new \StdClass();
    }

    /**
     * {@inheritdoc}
     */
    public function getAction()
    {
        $id = $this->getRequest()->getParam('id');

        if ('me' === $id && $this->hasAuth()) {
            $this->data = $this->getCurrentUser()->toArray();
        } else {
            if (preg_match('/\d+/', $id)) {
                $column = 'id';
            } else {
                $column = 'username';
            }

            $model = Table::locate($column, $id);

            if ($model) {
                if ($model->hasPublicProfile() || $this->isSiteAdmin()) {
                    $this->data = $model->toArray();
                } else {
                    $this->_skipAction(403, 'ERR.FORBIDDEN');
                }
            } else {
                $this->_skipAction(404, 'ERR.RESOURCE_MISSING');
            }
        }
    }

    /**
     * {@inheritdoc}
     */
    public function indexAction()
    {
        $request    = $this->getRequest();
        $resultSet  = Table::all(
            $this->_getPageSize(),
            $request->getParam('sort'),
            $request->getParam('order') ?: 'desc'
        );

        $this->data = [];

        foreach ($resultSet as $model) {
            $this->data[] = $model->toArray();
        }
    }

    /**
     * {@inheritdoc}
     */
    public function postAction()
    {
        $model = Table::create();
        $this->_saveModel($model);

        $this->getResponse()
            ->setHttpResponseCode(201);
    }

    /**
     * {@inheritdoc}
     */
    public function putAction()
    {
        $model = Table::locate('id', $this->input->id);

        if ($model) {
            $this->_saveModel($model);
        }
    }
}
