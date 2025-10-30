package com.civet.backend.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
@Table(name = "venta_items")
@JsonIgnoreProperties({"hibernateLazyInitializer","handler"})
public class VentaItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "venta_id")
    @JsonBackReference
    private Venta venta;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "producto_id")
    @JsonIgnoreProperties({"hibernateLazyInitializer","handler"})
    private Producto producto;

    private Integer cantidad;

    @Column(name = "precio_unit")
    private BigDecimal precioUnit;

    // Opcional: si querés persistir el subtotal, mantenelo; si no, podés marcarlo @Transient
    private BigDecimal subtotal;

    @PrePersist
    @PreUpdate
    public void calcSubtotal() {
        if (precioUnit != null && cantidad != null) {
            this.subtotal = precioUnit.multiply(BigDecimal.valueOf(cantidad));
        }
    }

    // getters & setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Venta getVenta() { return venta; }
    public void setVenta(Venta venta) { this.venta = venta; }

    public Producto getProducto() { return producto; }
    public void setProducto(Producto producto) { this.producto = producto; }

    public Integer getCantidad() { return cantidad; }
    public void setCantidad(Integer cantidad) { this.cantidad = cantidad; }

    public BigDecimal getPrecioUnit() { return precioUnit; }
    public void setPrecioUnit(BigDecimal precioUnit) { this.precioUnit = precioUnit; }

    public BigDecimal getSubtotal() { return subtotal; }
    public void setSubtotal(BigDecimal subtotal) { this.subtotal = subtotal; }
}

