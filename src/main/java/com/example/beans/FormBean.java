package com.example.beans;

import com.example.data.models.MyEntityModel;
import com.example.services.EntityModelService;
import jakarta.enterprise.context.SessionScoped;
import jakarta.inject.Inject;
import jakarta.inject.Named;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.List;

@Named("FormBean")
@SessionScoped
@Getter
@Setter
public class FormBean implements Serializable {
    private String x;
    private String y;
    private String r;
    private MyEntityModel entityModel;

    @Inject
    private CheckerBean checkerBean;

    private EntityModelService entityModelService = new EntityModelService();

    // Метод обработки запроса, привязанный к кнопке в форме
    public String processRequest() {
        try {
            entityModel = checkerBean.getModel(x,y,r);
//            entityModelService.saveModel(entityModel);
        } catch (NumberFormatException e) {
            entityModel = null;
        }
        return null; // остаемся на той же странице после обработки
    }

    public List<MyEntityModel> getRequestHistory() {
        return null;
//        return entityModelService.findAllUsers();
    }

    public String getResult(){
        if(entityModel != null)
            return entityModel.toString();
        return "Не было точек на обработку";
    }
}
