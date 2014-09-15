<?php
/*
 * douggr/zf-rest-application
 *
 * @link https://github.com/douggr/zf-rest-application for the canonical source repository
 * @version 1.0.0
 */

return [
// General
'ERR.DUPLICATED'                    => "Duplicated entry",
'ERR.EMAIL_INVALID'                 => "The given email address (%s) is not valid.",
'ERR.FORBIDDEN'                     => "Forbidden",
'ERR.MISSING'                       => "The resource you are looking for is missing",
'ERR.UNCATEGORIZED'                 => "Uncategorized",
'ERR.UNKNOWN'                       => "Unknown error",
'ERR.UNAUTHORIZED'                  => "Unauthorized",
'ERR.USER_AGENT_REQUIRED'           => "Request forbidden by administrative rules.\nPlease make sure your request has a 'User-Agent' header.",
'ERR.VALIDATION_INVALID'            => "Errors occurred when validating the form",

// JSON errors
'ERR.JSON_CTRL_CHAR'                => "Problems parsing JSON data.\nControl character error, possibly incorrectly encoded.",
'ERR.JSON_DEPTH'                    => "Problems parsing JSON data.\nThe maximum stack depth has been exceeded.",
'ERR.JSON_INF_OR_NAN'               => "Problems parsing JSON data.\nOne or more NAN or INF values in the value to be encoded.",
'ERR.JSON_RECURSION'                => "Problems parsing JSON data.\nOne or more recursive references in the value to be encoded.",
'ERR.JSON_STATE_MISMATCH'           => "Invalid or malformed JSON.",
'ERR.JSON_SYNTAX'                   => "Syntax error, malformed JSON.",
'ERR.JSON_UNSUPPORTED_TYPE'         => "Problems parsing JSON data.\nA value of a type that cannot be encoded was given.",
'ERR.JSON_UTF8'                     => "Problems parsing JSON data.\nMalformed UTF-8 characters, possibly incorrectly encoded.",

// Auth
'ERR.CREDENTIAL_INVALID'            => "Credential invalid.",
'ERR.IDENTITY_AMBIGUOUS'            => "This identity is ambiguous.",
'ERR.IDENTITY_NOT_FOUND'            => "Identity not found.",
'ERR.UNCATEGORIZED'                 => "Uncategorized error.",

// Locales
'ERR.UNKNONWN_LOCALE'               => "Unknonwn locale.",

// Entity
'ERR.VISIBILITY_INVALID'            => "Visibility must me either 'PUBLIC' or 'PRIVATE'.",
];
