package com.example.beans;

import com.example.entities.PointEntity;
import com.example.services.CheckerModelService;
import com.example.services.EntityModelService;
import com.example.services.ParsParamsService;
import jakarta.enterprise.context.SessionScoped;
import jakarta.inject.Named;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.Date;

@Named("CheckerBean")
@SessionScoped
public class CheckerBean implements Serializable {

    @Getter
    @Setter
    private String result = "Не было точек на обработку";

    private final EntityModelService entityModelService = new EntityModelService();
    private final CheckerModelService checkerModelService = new CheckerModelService();
    private final ParsParamsService parsParamsService = new ParsParamsService();

    public void check(String x, String y, String r) {
        long startTime = System.currentTimeMillis();
        try {
            parsParamsService.pars(x, y, r);
            parsParamsService.validParams();
            boolean resultOfCalc = checkerModelService.calculate(parsParamsService.getX(), parsParamsService.getY(), parsParamsService.getR());
            PointEntity myEntityModel = new PointEntity(0L, parsParamsService.getX(), parsParamsService.getY(), parsParamsService.getR(), resultOfCalc, System.currentTimeMillis() - startTime, new Date());
            result = myEntityModel.toString();
            entityModelService.saveModel(myEntityModel);
        } catch (IllegalArgumentException e) {
            result = e.getMessage();
        }
    }
}
