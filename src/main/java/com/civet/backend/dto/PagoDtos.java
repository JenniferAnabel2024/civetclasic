package com.civet.backend.dto;

import java.math.BigDecimal;

public class PagoDtos {
    public static class CrearPagoRequest {
        public String medio;      
        public BigDecimal monto;
        public String nota;        
    }
}
