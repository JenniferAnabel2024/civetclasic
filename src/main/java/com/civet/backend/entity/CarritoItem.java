package com.civet.backend.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity @Table(name = "carrito_items")
public class CarritoItem {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String producto;
    private Integer cantidad;
    @Column(precision=12, scale=2) private BigDecimal precioUnitario;
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getProducto() { return producto; }
    public void setProducto(String producto) { this.producto = producto; }
    public Integer getCantidad() { return cantidad; }
    public void setCantidad(Integer cantidad) { this.cantidad = cantidad; }
    public BigDecimal getPrecioUnitario() { return precioUnitario; }
    public void setPrecioUnitario(BigDecimal precioUnitario) { this.precioUnitario = precioUnitario; }
}