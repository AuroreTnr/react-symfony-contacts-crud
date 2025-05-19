import React from "react";
import { AdminGuesser } from '@api-platform/admin';

function AdminApp() {
  return <AdminGuesser entrypoint="http://localhost:8000/api" />;
}

export default AdminApp;
