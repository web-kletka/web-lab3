package com.example.beans;

import com.example.entities.PointEntity;
import com.example.services.EntityModelService;
import jakarta.enterprise.context.SessionScoped;
import jakarta.faces.context.FacesContext;
import jakarta.inject.Named;
import lombok.Getter;
import lombok.Setter;

import java.io.IOException;
import java.io.Serializable;
import java.util.List;

@Named("TableBean")
@SessionScoped
@Getter
@Setter
public class TableBean implements Serializable {

    private final EntityModelService entityModelService = new EntityModelService();

    public void clearTable(){
        entityModelService.clearTable();
        try {
            FacesContext.getCurrentInstance().getExternalContext().redirect("index.xhtml");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public List<PointEntity> getRequestHistory() {
        return entityModelService.findAllUsers();
    }
}
