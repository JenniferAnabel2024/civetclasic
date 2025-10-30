package com.civet.backend.dto;

import java.math.BigDecimal;

public class CarritoDtos {
    public static class CrearCarritoRequest {
        public Long pacienteId; // opcional
    }
    public static class AgregarItemRequest {
        public Long productoId;
        public Integer cantidad;
        public BigDecimal precioUnitario; // opcional; si es null, se usa el precio del producto
    }
    public static class CheckoutRequest {
        public String nota; // opcional
    }
}

