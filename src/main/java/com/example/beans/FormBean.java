package com.example.beans;

import com.example.data.models.MyEntityModel;
import com.example.services.EntityModelService;
import jakarta.enterprise.context.SessionScoped;
import jakarta.faces.context.FacesContext;
import jakarta.inject.Inject;
import jakarta.inject.Named;
import lombok.Getter;
import lombok.Setter;

import java.io.IOException;
import java.io.Serializable;
import java.util.List;
import java.util.Objects;

@Named("FormBean")
@SessionScoped
@Getter
@Setter
public class FormBean implements Serializable {
    private String x;
    private String y;
    private String r;
    private MyEntityModel entityModel;

    private boolean checkbox1;
    private boolean checkbox2;
    private boolean checkbox3;
    private boolean checkbox4;
    private boolean checkbox5;

    private String result = "";

    @Inject
    private CheckerBean checkerBean;


    private EntityModelService entityModelService = new EntityModelService();

    // Метод обработки запроса, привязанный к кнопке в форме
    public void processRequest() {
        try {
            entityModel = checkerBean.getModel(x,y,r);
            if (Objects.equals(entityModel.getInfo(), "ok"))
                entityModelService.saveModel(entityModel);
        } catch (NumberFormatException e) {
            entityModel = null;
        }
        try {
            FacesContext.getCurrentInstance().getExternalContext().redirect("index.xhtml");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public void clearTable(){
        entityModelService.clearTable();
        try {
            FacesContext.getCurrentInstance().getExternalContext().redirect("index.xhtml");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public List<MyEntityModel> getRequestHistory() {
        return entityModelService.findAllUsers();
    }

    public String getResult(){
        if(entityModel != null && Objects.equals(entityModel.getInfo(), "ok"))
            result = entityModel.toString();
        else if(entityModel != null)
            result = entityModel.getInfo();
        else
            result = "Не было точек на обработку";
        return result;
    }
}
