// src/routes/AppRouter.tsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ListPage from '../pages/ListPage';
import FormPage from '../pages/FormPage';
import ItemPage from '../pages/ItemPage';

export const AppRouter: React.FC = () => (
    <Routes>
      <Route path="/" element={<Navigate to="/list" replace />} />
      <Route path="/list" element={<ListPage />} />
      <Route path="/form" element={<FormPage />} />
      <Route path="/item/:type/:id" element={<ItemPage />} />
      <Route path="/edit/:type/:id" element={<ItemPage />} /> 
    </Routes>
);
