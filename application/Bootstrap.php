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
class Bootstrap extends Zend_Application_Bootstrap_Bootstrap
{
    /**
     * {@inheritdoc}
     */
    protected function _initRestRoute()
    {
        $front = Zend_Controller_Front::getInstance();
        $front->setResponse(new ZfRest\Http\Response());
        $front->setRequest(new ZfRest\Http\Request());

        $front->getRouter()
            ->addRoute('zf-rest', new Zend_Rest_Route($front));
    }

    /**
     * {@inheritdoc}
     */
    protected function _initDb()
    {
        $this->getPluginResource('multidb')
            ->init();

        $resource = $this->getPluginResource('multidb')
            ->getDb('default');

        Zend_Registry::set('multidb', $resource);
    }

    /**
     * {@inheritdoc}
     */
    protected function _initLocale()
    {
        $this->bootstrap('translate');

        try {
            $locale = new Zend_Locale(Zend_Locale::BROWSER);
        } catch (\Zend_Locale_Exception $e) {
            $locale = $this->getOption('resources')['translate']['locale'];
        }

        // must have, c'mon Zend…
        $locale = str_replace('_', '-', $locale);

        Zend_Registry::get('Zend_Translate')
            ->setLocale($locale);

        Zend_Registry::set('Zend_Locale', $locale);
    }
}
