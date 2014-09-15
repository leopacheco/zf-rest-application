<?php
/*
 * douggr/zf-rest-application
 *
 * @link https://github.com/douggr/zf-rest-application for the canonical source repository
 * @version 1.0.0
 */

use ZfRest\Model\Group as Table;

/**
 * {@inheritdoc}
 */
class Default_GroupsController extends ZfRest\Controller\Rest
{
    /**
     * {@inheritdoc}
     */
    public function getAction()
    {
        $id    = $this->getRequest()->getParam('id');
        $model = Table::locate('id', $id);

        if ($model) {
            if ($this->isSiteAdmin()) {
                $this->data = $model->toArray();
            } else {
                $this->_skipAction(403, 'ERR.FORBIDDEN');
            }
        }
    }

    /**
     * {@inheritdoc}
     */
    public function indexAction()
    {
        $this->data = [];
        $request    = $this->getRequest();
        $resultSet  = Table::all(
            $this->_getPageSize(),
            $request->getParam('sort'),
            $request->getParam('order') ?: 'desc'
        );

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
