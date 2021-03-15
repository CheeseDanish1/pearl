import React from 'react';
import {useFormik} from 'formik';

export default function Form({initialValues, onSubmit, children}) {
  const formik = useFormik({
    initialValues,
    onSubmit,
  });
  return <form onSubmit={formik.handleSubmit}>{children(formik)}</form>;
}
