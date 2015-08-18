Redux Standard Action
====================

[![build status](https://img.shields.io/travis/kolodny/redux-standard-action/master.svg?style=flat-square)](https://travis-ci.org/kolodny/redux-standard-action)
[![npm version](https://img.shields.io/npm/v/redux-standard-action.svg?style=flat-square)](https://www.npmjs.com/package/redux-standard-action)

This module is based directly off of [flux-standard-action](https://github.com/acdlite/flux-standard-action)

## Introduction

A human-friendly standard for Redux action objects. Feedback welcome.

### Motivation

It's much easier to work with Redux actions if we can make certain assumptions about their shape. For example, essentially all Redux actions have an identifier field, such as `type`, `actionType`, or `actionId`. Many Redux implementations also include a way for actions to indicate success or failure, especially as the result of a data-fetching operation. Defining a minimal, common standard for these patterns enables the creation of useful tools and abstractions.

### Errors as a first class concept

Redux actions can be thought of as an asychronous sequence of values. It is important for asynchronous sequences to deal with errors. Currently, many Redux implementations don't do this, and instead define separate action types like `LOAD_SUCCESS` and `LOAD_FAILURE`. This is less than ideal, because it overloads two separate concerns: disambiguating actions of a certain type from the "global" action sequence, and indicating whether or not an action represents an error. FSA treats errors as a first class concept.

### Design goals

- **Human-friendly.** FSA actions should be easy to read and write by humans.
- **Useful**. FSA actions should enable the creation of useful tools and abstractions.
- **Simple.** FSA should be simple, straightforward, and flexible in its design.

### Example

A basic Redux Standard Action:

```js
{
  type: 'ADD_TODO',
  payload: {
    text: 'Do something.'  
  }
}
```

An FSA that represents an error, analogous to a rejected Promise:

```js
{
  type: 'ADD_TODO',
  payload: new Error(),
  error: true
}
```

## Actions

An action MUST

- be a plain JavaScript object.
- have a `type` property.

An action MAY

- have a `error` property.
- have a `payload` property.
- have a `meta` property.

An action MUST NOT include properties other than `type`, `payload`, and `error`, and `meta`.

### `type`

The `type` of an action identifies to the consumer the nature of the action that has occurred. `type` can only be a string constant or a Symbol.

### `payload`

The optional `payload` property MAY be any type of value. It represents the payload of the action. Any information about the action that is not the `type` or status of the action should be part of the `payload` field.

If `error` is `true`, the `payload` MUST be an error object. This is akin to rejecting a promise with an error object.

### `error`

The `error` property MUST be set to `true` if the action represents an error.

An action whose `error` is true is analogous to a rejected Promise. By convention, the `payload` SHOULD be an error object.

If `error` has any other value besides `true`, including `undefined` and `null`, the action MUST NOT be interpreted as an error.

### `meta`

The optional `meta` property MAY be any type of value. It is intended for any extra information that is not part of the payload.

## Utility functions

The module `redux-standard-action` is available on npm. It exports a few utlity functions.

```js
import { isRSA } from 'redux-standard-action';
```
### `isFSA(action)`

Returns true if `action` is FSA compliant.
